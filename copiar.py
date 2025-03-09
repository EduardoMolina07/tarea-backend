import os
import tkinter as tk
from tkinter import filedialog

# Lista de carpetas a ignorar
CARPETAS_IGNORAR = {"node_modules", ".git", "__pycache__"}

def seleccionar_carpeta():
    """Abre un diálogo para seleccionar una carpeta y retorna la ruta seleccionada."""
    root = tk.Tk()
    root.withdraw()  # Oculta la ventana principal
    folder_path = filedialog.askdirectory(title="Selecciona la carpeta a procesar")
    return folder_path

def leer_archivo(ruta):
    """
    Intenta leer un archivo con UTF-8, si falla con Latin-1, y si aún falla, 
    utiliza UTF-8 reemplazando caracteres inválidos.
    """
    try:
        with open(ruta, 'r', encoding='utf-8') as f:
            return f.read()
    except UnicodeDecodeError:
        try:
            with open(ruta, 'r', encoding='latin-1') as f:
                return f.read()
        except UnicodeDecodeError:
            with open(ruta, 'r', encoding='utf-8', errors='replace') as f:
                return f.read()

def extraer_codigos(ruta_base, current_path, indent=""):
    """
    Recorre recursivamente la estructura de carpetas, generando una lista de cadenas
    que representa la estructura y el contenido de cada archivo.
    
    - ruta_base: carpeta seleccionada inicialmente, para calcular la ruta relativa.
    - current_path: ruta de la carpeta actual en la recursión.
    - indent: cadena de indentación para visualizar la estructura.
    """
    lineas = []
    # Listamos y ordenamos los elementos para una vista ordenada
    for item in sorted(os.listdir(current_path)):
        item_path = os.path.join(current_path, item)
        
        # Si es una carpeta y está en la lista de exclusión, la saltamos
        if os.path.isdir(item_path) and item in CARPETAS_IGNORAR:
            continue
        
        if os.path.isdir(item_path):
            # Mostramos el nombre de la carpeta
            lineas.append(indent + f"[{item}]/")
            # Llamada recursiva con mayor indentación
            lineas.extend(extraer_codigos(ruta_base, item_path, indent + "    "))
        else:
            # Calculamos la ruta relativa para saber exactamente dónde está el archivo
            ruta_relativa = os.path.relpath(item_path, ruta_base)
            # Leer el contenido del archivo utilizando la función leer_archivo
            codigo = leer_archivo(item_path)
            # Agregar la información del archivo
            lineas.append(indent + f"{item}:")
            lineas.append(indent + "-" * 40)
            lineas.append(codigo)
            lineas.append(indent + "-" * 40)
    return lineas

if __name__ == "__main__":
    carpeta_procesar = seleccionar_carpeta()
    if carpeta_procesar:
        print(f"Procesando archivos en: {carpeta_procesar}\n")
        contenido = extraer_codigos(carpeta_procesar, carpeta_procesar)
        # Ruta fija para guardar el archivo resultado
        ruta_archivo = os.path.join(r"C:\Users\jeamp\Downloads", "resultado1.txt")
        with open(ruta_archivo, "w", encoding="utf-8") as file:
            file.write("\n".join(contenido))
        print(f"Se ha generado el archivo: {ruta_archivo}")
    else:
        print("No se seleccionó ninguna carpeta para procesar.")
