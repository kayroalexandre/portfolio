## Design System - Layout Components

O projeto agora possui um conjunto padronizado de componentes de layout para garantir consistência e reutilização em todas as páginas.

### 🎯 Princípios

1. **Autocontidos**: Componentes controlam seu próprio espaçamento
2. **Reutilizáveis**: Sem dependências de contexto externo
3. **Responsivos**: Mobile-first, sem margens negativas
4. **Profissionais**: Seguindo padrões de design recomendados

### 📐 Componentes Disponíveis

#### 1. **SectionContainer**

Wrapper padrão para seções com padding consistente.

```tsx
import { SectionContainer } from '@/app/components/ui/layout-container';

<SectionContainer
  border="top" // 'top' | 'none'
  padding="normal" // 'compact' | 'normal' | 'large'
  className="extra-classes"
>
  Conteúdo...
</SectionContainer>;
```

**Espaçamentos**:

- Horizontal: `px-6 md:px-12` (24px / 48px)
- Vertical (compact): `py-12` (48px)
- Vertical (normal): `py-20` (80px)
- Vertical (large): `py-24` (96px)

---

#### 2. **ThreeColumnLayout**

Layout distribuído com 3 colunas: esquerda/centro/direita.

```tsx
import { ThreeColumnLayout } from '@/app/components/ui/layout-three-column';

<ThreeColumnLayout
  left={<div>Conteúdo esquerda</div>}
  center={<div>Conteúdo centro</div>}
  right={<div>Conteúdo direita</div>}
  gap="loose" // 'compact' | 'normal' | 'loose'
  className="extra-classes"
/>;
```

**Responsividade**:

- Mobile: Empilha 1 coluna
- Desktop: 3 colunas com alinhamentos (`start`, `center`, `end`)

**Uso**:

- Services section (HomePage)
- Footer

---

#### 3. **SidebarLayout**

Layout flexível sidebar + main content.

```tsx
import { SidebarLayout } from '@/app/components/ui/layout-sidebar';

<SidebarLayout
  sidebar={<div>Barra lateral</div>}
  main={<div>Conteúdo principal</div>}
  sidebarWidth="1/4" // '1/4' | '1/3' | '1/2'
  gap="loose" // 'normal' | 'loose' | 'spacious'
  className="extra-classes"
/>;
```

**Responsividade**:

- Mobile: Empilha (sidebar acima do main)
- Desktop: Lado a lado com proporção configurável

**Gaps Disponíveis**:

- normal: `gap-8` (32px)
- loose: `gap-12` (48px)
- spacious: `gap-16` (64px)

**Uso**:

- ContactPage (1/4 + 3/4, gap-loose)
- CaseStudyPage metadata (1/3 + 2/3, gap-spacious)
- SectionHeader (1/4 + 3/4, gap-normal)

---

### 📊 Escala de Spacing

**Padrão de bases** (escala em múltiplos de 4px):

| Token | Valor CSS | Pixel | Uso                             |
| ----- | --------- | ----- | ------------------------------- |
| -     | `gap-4`   | 16px  | Compact grids (muito raramente) |
| -     | `gap-6`   | 24px  | Galeria, card grids             |
| -     | `gap-8`   | 32px  | Layout normal                   |
| -     | `gap-12`  | 48px  | Sidebar + main (loose)          |
| -     | `gap-16`  | 64px  | Sidebar + main (spacious)       |

**Padding Horizontal**:

- Mobile: `px-6` (24px)
- Desktop: `px-12` (48px)

**Padding Vertical**:

- Compact: `py-12` (48px)
- Normal: `py-20` (80px)
- Large: `py-24` (96px)

---

### ✅ Checklist de Uso

Ao criar uma nova seção:

- [ ] Use `SectionContainer` para padding padrão
- [ ] Para layout horizontal, escolha:
  - [ ] `ThreeColumnLayout` - 3 colunas distribuídas
  - [ ] `SidebarLayout` - sidebar + main
- [ ] Use gaps da escala (gap-4, 6, 8, 12, 16)
- [ ] Sem margens negativas (`-mx-*`, `-my-*`)
- [ ] Responsive: mobile-first (1 col, depois md:N cols)

---

### ❌ Anti-padrões Removidos

✗ DistributedColumns (removido - quebrava layout)
✗ Margens negativas com compensação de padding
✗ Layouts manuais com flex/grid sem componente
✗ Valores de spacing fora da escala

---

### 📝 Exemplos Práticos

#### Exemplo 1: Hero + Services (HomePage)

```tsx
import { SectionContainer } from '@/app/components/ui/layout-container';
import { ThreeColumnLayout } from '@/app/components/ui/layout-three-column';

<SectionContainer border="none" padding="large">
  <h1>Título</h1>
</SectionContainer>

<SectionContainer border="top" padding="normal">
  <SectionHeader title="Serviços" />
  <div className="border-t border-shell-border pt-10">
    <ThreeColumnLayout
      left={<div>Escopo</div>}
      center={<div>Foco</div>}
      right={<div>Entregáveis</div>}
    />
  </div>
</SectionContainer>
```

#### Exemplo 2: Contact Page (Sidebar + Form)

```tsx
import { SidebarLayout } from '@/app/components/ui/layout-sidebar';

<SidebarLayout
  sidebarWidth="1/4"
  gap="loose"
  sidebar={<div>Instruções</div>}
  main={<form>Formulário</form>}
/>;
```

#### Exemplo 3: Case Study (Metadata + Description)

```tsx
import { SidebarLayout } from '@/app/components/ui/layout-sidebar';

<SidebarLayout
  sidebarWidth="1/3"
  gap="spacious"
  sidebar={
    <div className="space-y-6">
      <div>Cliente: {client}</div>
      <div>Categoria: {category}</div>
    </div>
  }
  main={<p>{description}</p>}
/>;
```

---

### 🔧 Customização

Todos os componentes aceitam `className` para customizações adicionais:

```tsx
<ThreeColumnLayout
  left={...}
  center={...}
  right={...}
  className="text-[0.8rem]"  // Classes extras
/>
```

---

**Última atualização**: Atual
**Componentes**: 3 (SectionContainer, ThreeColumnLayout, SidebarLayout)
**Status**: ✅ Ativo em produção
