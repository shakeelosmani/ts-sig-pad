import { SignaturePadController } from "./signature-pad";

let signature1 = new SignaturePadController(document.getElementById("canvas1") as HTMLCanvasElement, window);

let signature2 = new SignaturePadController(document.getElementById("canvas2") as HTMLCanvasElement, window, {backgroundColor: "rgb(255,255,255)"});

document.getElementById('save-png1')?.addEventListener('click', () => {
    console.log(signature1.saveAsPng());
})

document.getElementById('clear1')?.addEventListener('click', () => {
    signature1.clearSignature();
})


document.getElementById('save-jpg2')?.addEventListener('click', () => {
    console.log(signature2.saveAsJpeg());
})

document.getElementById('clear2')?.addEventListener('click', () => {
    signature2.clearSignature();
})

document.getElementById('undo')?.addEventListener('click', () => {
    signature2.undoSignature();
})