let x = 50
let cont = 0

const fs = require('fs');
const readline = require('readline');
const path = require('path'); 

const nomeArquivo = 'ex1.txt';
const caminhoAbsoluto = path.join(__dirname, nomeArquivo);

async function processarArquivoLinhaPorLinha() { 
  try {
    const fileStream = fs.createReadStream(caminhoAbsoluto);
    
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    let contadorLinhas = 0;

    for await (const linha of rl) {
      contadorLinhas++;
      
      
      
      
        if(linha.startsWith('R')){      /// SE A LINHA COMEÇA COM R O PROGRAMA IRÁ ENTRAR DENTRO DO IF
            const num = linha.split("R")
            console.log(num)
            if (x+ Number(num[1]) > 99 ){ // LE O NUMERO DENTRO DO VETOR, SE O NUMERO FOR MAIOR QUE 99 IRÁ SUBTRAIR 100
                cont++
                x = x + Number(num[1]) - 100
                while((x) > 99){ // SUBTRAI 100 ATÉ QUE O NUMERO FIQUE MENOR OU IGUAL 99
                    cont++
                    x = x - 100
                }
                if (x == 0){
                  cont--  // Diminui um na resposta após a soma para não contar zeros duplicados
                }
                if(x+ Number(num[1]) == 0){
                  cont-- // DESCONSIDERAR ZEROS CONTADOS DUAS VEZES
                }
            }
            else{
               x = x+ Number(num[1]) // CASO NÃO FOR MAIOR QUE 99 IRÁ SOMAR O NUMERO NORMALMENTE
            }
            
            if (x == 0){
                    cont++ // ADICIONA MAIS UM NA RESPOSTA
            }
        }




        else if(linha.startsWith('L')){ /// SE A LINHA COMEÇA COM L O PROGRAMA IRÁ ENTRAR DENTRO DO IF

            const num = linha.split("L") // SEPARA A LINHA ENTRE UM VETOR
            if (x == 0){
                cont--  // SUBTRAI MENOS UM NA RESPOSTA, DESCONSIDERAR ZEROS CONTADOS DUAS VEZES
            }
            if (x - Number(num[1]) < 0 ){ // LE O NUMERO DENTRO DO VETOR, SE O NUMERO FOR MENOR QUE 0 IRÁ SOMAR 100            
                cont++ // ADICIONA UM AO CONTADOR QUANDO FOR DEIXAR O NUMERO POSITIVO (IRÁ PASSAR POR ZERO)
                x = x - Number(num[1]) + 100
                while((x) < 0){ // ENQUANTO O NUMERO FOR MENOR QUE ZERO SOMA 100
                    cont++
                    x = x + 100
                }
            }
            else{
               x = x - Number(num[1]) // CASO A SUBTRAÇÃO NÃO FOR MENOR QUE ZERO IRÁ SUBTRAIR O NUMERO NORMALMENTE
            }
            if (x == 0){
                cont++  // ADICIONA MAIS UM NA RESPOSTA
            }

        }
            console.log(`Linha ${contadorLinhas}: ${linha}`);
            console.log(`\n✅ Resposta`, cont, ' X = ', x);

    }

    
  } catch (erro) {
    console.error(`❌ Erro ao ler ou processar o arquivo: ${erro.message}`);
  }
}

processarArquivoLinhaPorLinha();