import SignaturePad from "signature_pad";
/**
 *  Represents a class that is a signature pad controller.
 *  It utilizes the library https://github.com/szimek/signature_pad
 */
export class SignaturePadController {
  private domElem: HTMLCanvasElement;

  private window: Window;

  private sigInstance: SignaturePad | undefined;

  /**
   *
   * @param { HTMLCanvasElement }selector Must be a HTML canvas element on which you want to draw the signature.
   * @param { Window } window Must be the DOM's window object.
   * @param {SignaturePadOptions = } options Signature pad options. It is optional and defaults to empty object.
   */
  constructor(
    selector: HTMLCanvasElement,
    window: Window,
    options?: SignaturePadOptions
  ) {
    this.domElem = selector;
    this.window = window;
    this.sigInstance = new SignaturePad(this.domElem, options || {});
    this.resizeCanvas();

    this.window.addEventListener("resize", () => {
      this.resizeCanvas();
    });
  }

  public resizeCanvas(): void {
    const ratio = Math.max(this.window.devicePixelRatio || 1, 1);
    this.domElem.width = this.domElem.offsetWidth * ratio;
    this.domElem.height = this.domElem.offsetHeight * ratio;
    this.domElem.getContext("2d")?.scale(ratio, ratio);
  }

  public saveAsJpeg(): string | undefined {
    return this.sigInstance?.toDataURL("image/jpeg");
  }

  public saveAsPng(): string | undefined {
    return this.sigInstance?.toDataURL("image/png");
  }

  public saveAsSvg(): string | undefined {
    const data = this.sigInstance?.toDataURL("image/svg+xml");
    if (data) {
      return atob(data.split(",")[1]);
    }
  }

  public clearSignature(): void {
    this.sigInstance?.clear();
    this.sigInstance?.backgroundColor;
  }

  public isSignatureEmpty(): boolean | undefined {
    return this.sigInstance?.isEmpty();
  }

  public undoSignature(): void {
    const data = this.sigInstance?.toData();
    if (data) {
      data.pop();
      this.sigInstance?.fromData(data);
    }
  }

  public eraseSignature(): void {
    const ctx = this.domElem.getContext("2d");
    if (ctx) {
      ctx.globalCompositeOperation = "destination-out";
    }
  }

  public getSignaturePadInstance(): SignaturePad | undefined {
    return this.sigInstance;
  }
}

export interface SignaturePadOptions {
  /**
   * dotSize: (float) Radius of a single dot.
   */
  dotSize?: number | undefined;
  /**
   * minWidth: (Between 0 and 1) Minimum width of a line. Defaults to 0.5.
   */
  minWidth?: number | undefined;
  /**
   * maxWidth: (float) Maximum width of a line. Defaults to 2.5.
   */
  maxWidth?: number | undefined;
  /**
   * throttle: (integer) Draw the next point at most once per every x milliseconds. Set it to 0 to turn off throttling. Defaults to 16.
   */
  throttle?: number | undefined;
  /**
   * minDistance: (integer) Add the next point only if the previous one is farther than x pixels. Defaults to 5.
   */
  minDistance?: number | undefined;
  /**
   * backgroundColor: (string) Color used to clear the background. Can be any color format accepted by context.fillStyle.
   * Defaults to "rgba(0,0,0,0)" (transparent black). Use a non-transparent color e.g. "rgb(255,255,255)"
   * (opaque white) if you'd like to save signatures as JPEG images other wise the signature would not be visible.
   */
  backgroundColor?: string | undefined;
  /**
   * penColor: (string) Color used to draw the lines. Can be any color format accepted by context.fillStyle. Defaults to "black".
   */
  penColor?: string | undefined;
  /**
   * velocityFilterWeight: (float) Weight used to modify new velocity based on the previous velocity. Defaults to 0.7.
   */
  velocityFilterWeight?: number | undefined;
}
