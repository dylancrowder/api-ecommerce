export default class Multer {
    constructor(type) {
        this.type = type;
    }

    switch() {
        switch (this.type) {
            case 'profile':
                // Manejar el tipo de archivo de perfil
                break;
            case 'products':
                // Manejar el tipo de archivo de productos
                break;
            case 'documents':
                // Manejar el tipo de archivo de documentos
                break;
            default:
                // Manejar otros tipos de archivos
                break;
        }
    }
}
