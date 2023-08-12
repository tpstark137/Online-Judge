const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");


const executeCpp = async (lang, filepath, input) => {
    let outputPath;
    if (lang === "cpp") outputPath = path.join(__dirname, "../backend/outputs/cpp");
    else if (lang === "java")
        outputPath = path.join(__dirname, "../backend/outputs/java");
    else if (lang === "py") outputPath = path.join(__dirname, "../backend/outputs/py");

    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
    }
    const jobId = path.basename(filepath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.exe`);
    console.log(input)
    const inp = path.join(outputPath, '/input.txt');
    // console,log(input)

    fs.writeFileSync(inp, input);
    const commands = {
        cpp: [`g++ ${filepath} -o ${outPath} && cd ${outputPath} && ./${jobId}.exe <${inp}`],
        java: [`javac ${filepath} && cd ${outputPath} && java ${jobId} <${inp}`],
        py: [`python3 ${filepath} <${inp}`]
    };


    return new Promise((resolve, reject) => {
        exec(
            commands[lang].join(" && "),
            (error, stdout, stderr) => {
                if (error) {
                    reject({ error, stderr });
                }
                if (stderr) {
                    reject(stderr);
                }
                resolve(stdout);
            }
        );
        console.log("compile")

    });
};

module.exports = {
    executeCpp,
};