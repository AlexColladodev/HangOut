from flask_uploads import UploadSet, IMAGES, configure_uploads

photos = UploadSet('photos', IMAGES)

def configure_upload(app):
    app.config['UPLOADED_PHOTOS_DEST'] = 'static/images'  # Directorio donde se guardarán las imágenes
    configure_uploads(app, photos)
