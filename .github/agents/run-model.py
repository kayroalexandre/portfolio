"""Run a selected model in Python.

This script uses only the Python standard library.

Environment variables:
  OPENAI_API_KEY   Required.
  OPENAI_BASE_URL  Optional, defaults to the OpenCode-compatible endpoint.
  OPENAI_MODEL     Optional, defaults to glm-5.1.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import urllib.error
import urllib.request
from typing import Any

DEFAULT_BASE_URL = 'https://opencode.ai/zen/go/v1/'
DEFAULT_MODEL = 'glm-5.1'


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description='Run a chat completion against a selected model.')
    parser.add_argument('prompt', nargs='?', help='Prompt text. If omitted, stdin is used.')
    parser.add_argument('--model', default=os.environ.get('OPENAI_MODEL', DEFAULT_MODEL))
    parser.add_argument('--max-tokens', type=int, default=4096)
    return parser.parse_args()


def read_prompt(prompt_arg: str | None) -> str:
    if prompt_arg:
        return prompt_arg

    if not sys.stdin.isatty():
        prompt = sys.stdin.read().strip()
        if prompt:
            return prompt

    raise SystemExit('Provide a prompt as an argument or pipe it through stdin.')


def build_request(endpoint: str, api_key: str, model: str, prompt: str, max_tokens: int) -> urllib.request.Request:
    payload = json.dumps(
        {
            'model': model,
            'messages': [
                {
                    'role': 'user',
                    'content': prompt,
                },
            ],
            'max_tokens': max_tokens,
        }
    ).encode('utf-8')

    return urllib.request.Request(
        endpoint,
        data=payload,
        headers={
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {api_key}',
        },
        method='POST',
    )


def main() -> None:
    args = parse_args()
    prompt = read_prompt(args.prompt)

    api_key = os.environ.get('OPENAI_API_KEY')
    if not api_key:
        raise SystemExit('Missing OPENAI_API_KEY environment variable.')

    base_url = os.environ.get('OPENAI_BASE_URL', DEFAULT_BASE_URL).rstrip('/')
    endpoint = f'{base_url}/chat/completions'

    request = build_request(endpoint, api_key, args.model, prompt, args.max_tokens)

    try:
        with urllib.request.urlopen(request) as response:
            response_data: dict[str, Any] = json.load(response)
    except urllib.error.HTTPError as error:
        error_body = error.read().decode('utf-8', errors='replace')
        raise SystemExit(f'HTTP {error.code}: {error_body}') from error

    choice = response_data['choices'][0]
    message = choice['message']
    tool_calls = message.get('tool_calls')

    if tool_calls:
        raise RuntimeError(
            'This runner does not provide local tools. '
            'Disable tool calling or add explicit tool handlers before retrying.'
        )

    print(message.get('content') or '')


if __name__ == '__main__':
    main()
