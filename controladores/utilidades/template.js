// Función para agregar referencia CSS con cache busting
function cssReference(href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${href}?v=1.0.0`; 
    document.head.appendChild(link);
}

// Función para generar el HTML del sidebar
function sideBar() {
    return `
        <aside id="sidebar" class="sidebar">
            <div class="d-flex">
                <button class="toggle-btn" type="button">
                    <img src="../recursos/img/vector.png" alt="Logo" width="24px" height="24px">
                </button>
                <div class="sidebar-logo">
                    <a href="#">Pemi Parts</a>
                </div>
            </div>
            <ul class="sidebar-nav">
                <li class="sidebar-item">
                    <a href="#" class="sidebar-link">
                        <i class="bi bi-box-seam"></i>
                        <span>Productos</span>
                    </a>
                </li>
                <li class="sidebar-item">
                    <a href="#" class="sidebar-link">
                        <i class="bi bi-people"></i>
                        <span>Usuarios</span>
                    </a>
                </li>
                <li class="sidebar-item">
                    <a href="#" class="sidebar-link">
                        <i class="bi bi-person-lines-fill"></i>
                        <span>Clientes</span>
                    </a>
                </li>
                <li class="sidebar-item">
                    <a href="#" class="sidebar-link">
                        <i class="bi bi-layout-text-window-reverse"></i>
                        <span>Contenedor</span>
                    </a>
                </li>
                <li class="sidebar-item">
                    <a href="#" class="sidebar-link">
                        <i class="bi bi-file-text"></i>
                        <span>Cotizaciones</span>
                    </a>
                </li>
            </ul>
            <div class="sidebar-footer">
                <a href="#" class="sidebar-link" aria-label="Cerrar sesión">
                    <i class="lni lni-exit"></i>
                </a>
                <select class="form-select ms-2 ms-md-5 dropup" aria-label="Cambiar Idioma">
                    <option value="en">English</option>
                    <option selected="es">Español</option>
                </select>
            </div>
        </aside>
    `;
}

// Función para cargar la template
function loadTemplate() {
    const mainElement = document.querySelector('main'); 

    if (mainElement) {
        mainElement.classList.add('wrapper', 'd-flex'); 

        // Crear el div #mainTitle dinámicamente
        const mainTitleDiv = document.createElement('div');
        mainTitleDiv.id = 'mainTitle';
        mainTitleDiv.classList.add('flex-shrink-0');
        mainElement.insertBefore(mainTitleDiv, mainElement.firstChild); 


        const sidebarHTML = sideBar();
        mainTitleDiv.innerHTML = sidebarHTML;

        // Agregar evento al botón hamburguesa
        const hamBurger = mainTitleDiv.querySelector(".toggle-btn");
        hamBurger.addEventListener("click", function () {
            mainTitleDiv.querySelector("#sidebar").classList.toggle("expand");
        });

        const mainContentDiv = document.getElementById('mainContent');
        if (mainContentDiv) {
            mainContentDiv.classList.add('main', 'p-3', 'text-center');
        }
    }

    cssReference('../recursos/css/template_style.css'); 
}

document.addEventListener('DOMContentLoaded', loadTemplate);
