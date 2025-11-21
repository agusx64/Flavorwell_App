# Ingredients updater
import os
import cloudinary
import cloudinary.uploader
import mysql.connector
from dotenv import load_dotenv

load_dotenv()

IMAGE_FOLDER = 'C:/Users/agust/Downloads/ingredients_folder'
CLOUDINARY_FOLDER = 'recipe_icons'

cloudinary.config(

    cloud_name = os.environ.get('CLOUDINARY_CLOUD_NAME'),
    api_key = os.environ.get('CLOUDINARY_API_KEY'),
    api_secret = os.environ.get('CLOUDINARY_API_SECRET')

)

db_config = {

    'host': os.environ.get('DB_HOST'),
    'user': os.environ.get('DB_USER'),
    'password': os.environ.get('DB_PASSWORD'),
    'database': os.environ.get('DB_NAME'),
    'port': os.environ.get('DB_PORT')

}

def process_ingredients():

    connection = None
    cursor = None

    try:

        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        print("[SUCCESS] Connected to database...")

        if not os.path.exists(IMAGE_FOLDER):
            print(f"[ERROR] La carpeta no existe: {IMAGE_FOLDER}")
            return
        
        print(f"[PROCESS] Escaneando carpeta: {IMAGE_FOLDER}...")

        for filename in os.listdir(IMAGE_FOLDER):
            file_path = os.path.join(IMAGE_FOLDER, filename)

            if not os.path.isfile(file_path):
                continue

            ingredient_name = os.path.splitext(filename)[0]

            try:

                print(f"[PROCESS] Subiendo imagenes {filename}...")
                upload_result = cloudinary.uploader.upload(
                    file_path,
                    folder = CLOUDINARY_FOLDER,
                    public_id = ingredient_name,
                    overwrite = True
                )

                secure_url = upload_result.get('secure_url')
                if not secure_url:
                    print(f"[ERROR] Error al subir {filename}: No se obtuvo el URL.")
                    continue

                print(f"[SUCCESS] Imagen subida a Cloudinary: {secure_url}")

                sql = "INSERT INTO ingredients_list (name, src_reference) VALUES (%s, %s)"
                val = (ingredient_name, secure_url)

                try:
                    cursor.execute(sql, val)
                    connection.commit()
                    print(f"[SUCCESS] Insertado en la base de datos: {ingredient_name}")
                except mysql.connector.Error as err:
                    if err.errno == 1062:
                        print(f"[WARNING] '{ingredient_name}' ya existe en la base de datos: Omitiendo.")
                    else:
                        print(f"[ERROR] Error en la DB para {ingredient_name}: {err}")
                        connection.rollback()
            except Exception as e:
                print(f"[ERROR] Error procesando {filename}: {e}")
            
    except mysql.connector.Error as err:
        print(f"[ERROR] Error de conexión a MySQL: {err}")
    
    finally:
        if cursor:
            cursor.close()
        
        if connection and connection.is_connected():
            connection.close()
            print(f"[PROCESS] Conexión a MySQL cerrada")

if __name__ == "__main__":
    process_ingredients()
    print(f"[PROCESS] Proceso completado...")