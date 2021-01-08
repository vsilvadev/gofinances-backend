import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

// Caminho onde vamos salvar a pasta tmp
const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: tmpFolder,

  // Onde vamos armazenar (No disco)
  storage: multer.diskStorage({
    destination: tmpFolder,
    // Nome que o arquivo irá receber - Faremos um hash do nome para não correr o risco de haver repetição
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;
      // Callback aceita duas propriedades, a primeira é um erro caso exista e o segundo é o nome do arquivo caso ocorra um erro
      return callback(null, fileName);
    },
  }),
};
