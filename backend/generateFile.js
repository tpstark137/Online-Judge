const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');

const generateFile = async (format, content) => {
    const jobID = uuid();
    let fileDir;
    if (format === "cpp") fileDir = path.join(__dirname, "../backend/codes/cpp");
    else if (format === "java") fileDir = path.join(__dirname, "../backend/codes/java");
    else if (format === "py") fileDir = path.join(__dirname, "../backend/codes/py");

    if (!fs.existsSync(fileDir)) {
        fs.mkdirSync(fileDir, { recursive: true });
    }
    const filename = `${jobID}.${format}`;
    const filePath = path.join(fileDir, filename);
    await fs.writeFileSync(filePath, content);
    return filePath;
};

module.exports = {
    generateFile,
};