const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. CSS Flexbox Layout Fixes
html = html.replace('position: absolute; top: 1vh; /* Subido más arriba */', 'position: relative; margin-bottom: 2vh; /* Flex layout para moviles */');
html = html.replace('margin-top: 8vh; /* Se bajó la imagen para que no choque con el título */', 'margin-top: 0; flex: 0 1 auto; /* Flex layout para moviles */');
html = html.replace('position: absolute;\\n            bottom: 4vh; /* Abajo en la pantalla para hacer espacio a la imagen */', 'position: relative; margin-top: 2vh; min-height: 120px;');
html = html.replace('width: clamp(200px, 60vw, 380px);\\n            height: clamp(200px, 60vw, 380px);', 'width: clamp(160px, 45vmin, 380px);\\n            height: clamp(160px, 45vmin, 380px);');
html = html.replace('#screen-2.visible { display: flex; }', '#screen-2.visible { display: flex; flex-direction: column; justify-content: space-evenly; align-items: center; padding: 2vh 0; box-sizing: border-box; }');

// 2. JS Infinite Loop Fix
const oldJS = \// Secuencia de mensajes Bíblicos
            function startMessageSequence() {
                // Aparece el primer mensaje a los 2 segundos de que aparece la foto
                setTimeout(() => {
                    msg1.style.opacity = '1';
                    
                    // Se queda 6 segundos visible y luego se desvanece
                    setTimeout(() => {
                        msg1.style.opacity = '0';
                        
                        // Espera 2.5 segundos para que haya un momento de silencio visual, y muestra el segundo
                        setTimeout(() => {
                            msg2.style.opacity = '1';
                        }, 2500);
                        
                    }, 6500); 

                }, 2000);
            }\;

const newJS = \// Secuencia de mensajes Bíblicos Rotativa
            function startMessageSequence() {
                const messages = [msg1, msg2];
                let currentIndex = 0;

                function showNextMessage() {
                    const currentMsg = messages[currentIndex];
                    currentMsg.style.opacity = '1';
                    
                    setTimeout(() => {
                        currentMsg.style.opacity = '0';
                        currentIndex = (currentIndex + 1) % messages.length;
                        
                        // Espera a que se desvanezca y muestra el siguiente
                        setTimeout(showNextMessage, 2500);
                    }, 6000);
                }

                setTimeout(showNextMessage, 2000);
            }\;

html = html.replace(oldJS, newJS);

fs.writeFileSync('index.html', html, 'utf8');
