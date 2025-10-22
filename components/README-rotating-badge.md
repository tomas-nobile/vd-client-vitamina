# Badge Giratorio - Guía de Modificación

## 📁 Archivos Creados

1. **`components/rotating-badge.html`** - Componente HTML separado
2. **`css/rotating-badge.css`** - Estilos CSS específicos
3. **`components/README-rotating-badge.md`** - Esta guía

## 🔧 Cómo Modificar el Texto

### Opción 1: Cambiar la Imagen
1. Crea una nueva imagen con el texto deseado
2. Reemplaza `images/Scroll-Button.png` con tu nueva imagen
3. Actualiza el atributo `alt` en el HTML

### Opción 2: Usar HTML/CSS (Recomendado)
1. Abre `css/rotating-badge.css`
2. Descomenta la sección `/* Versión alternativa con texto HTML */`
3. Comenta o elimina la imagen en el HTML
4. Modifica el texto en `.rotating-badge-text::before`

## 🎨 Personalización de Estilos

### Cambiar Colores
```css
.rotating-badge-text {
  background: linear-gradient(135deg, #TU_COLOR_1, #TU_COLOR_2);
}
```

### Cambiar Tamaño
```css
.hero_rotating-badge {
  width: 200px;  /* Cambiar tamaño */
  height: 200px;
}
```

### Cambiar Velocidad de Rotación
```css
.hero_rotating-badge {
  animation: rotate 5s linear infinite; /* 5s = más rápido */
}
```

## 📱 Responsive

Los estilos ya incluyen breakpoints para:
- Desktop: 150px
- Tablet: 120px  
- Móvil: 100px

## 🚀 Implementación

El componente ya está integrado en `index.html` y se carga automáticamente.

## 📝 Texto Actual

**Actual**: "Diseño y desarrollo web personalizado"
**Ubicación**: `index.html` línea 76 (atributo alt)

## 🔄 Próximos Pasos

1. **Para cambiar texto**: Modifica el atributo `alt` o implementa la versión HTML
2. **Para cambiar imagen**: Reemplaza `Scroll-Button.png`
3. **Para personalizar**: Edita `css/rotating-badge.css`
