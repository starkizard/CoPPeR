const {exec} = require("child_process");

class Runner {

    constructor(in_file,out_file,res_file){
        this.in_file = in_file;
        this.out_file = out_file;
        this.res_file = res_file;
    }

    cpp_runner(filename){ //filename without ext
        exec(`g++ ${filename}.cpp -o ${filename} && ./${filename} < ${this.in_file} > ${this.res_file}`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });
    }

    //add more runners here

}

module.exports = {Runner};