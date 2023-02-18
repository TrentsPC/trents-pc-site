import { SvelteRequest } from "./id";
import { Code, CompileData } from "./compile";

export class VitePluginSvelteCache {
  private _css = new Map<string, Code>();

  public update(compileData: CompileData) {
    this.updateCSS(compileData);
  }

  public has(svelteRequest: SvelteRequest) {
    const id = svelteRequest.normalizedFilename;
    return this._css.has(id);
  }

  private updateCSS(compileData: CompileData) {
    this._css.set(compileData.normalizedFilename, compileData.compiled.css);
  }

  public remove(
    svelteRequest: SvelteRequest,
    keepDependencies: boolean = false
  ): boolean {
    const id = svelteRequest.normalizedFilename;
    let removed = false;
    if (this._css.delete(id)) {
      removed = true;
    }

    return removed;
  }

  public getCSS(svelteRequest: SvelteRequest) {
    return this._css.get(svelteRequest.normalizedFilename);
  }
}
