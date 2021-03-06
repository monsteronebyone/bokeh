/* XXX: partial */
import {Annotation, AnnotationView} from "./annotation";
import {Toolbar} from "../tools/toolbar"
import {build_views, remove_views} from "core/build_views";
import {empty, show, hide} from "core/dom";
import * as p from "core/properties"

export class ToolbarPanelView extends AnnotationView {
  model: ToolbarPanel

  initialize(options: any): void {
    super.initialize(options);
    this.plot_view.canvas_events.appendChild(this.el);
    this._toolbar_views = {};
    build_views(this._toolbar_views, [this.model.toolbar], {parent: this});
  }

  remove() {
    remove_views(this._toolbar_views);
    return super.remove();
  }

  render() {
    super.render();

    if (!this.model.visible) {
      hide(this.el);
      return;
    }

    const { panel } = this.model;

    this.el.style.position = "absolute";
    this.el.style.left = `${panel._left.value}px`;
    this.el.style.top = `${panel._top.value}px`;
    this.el.style.width = `${panel._width.value}px`;
    this.el.style.height = `${panel._height.value}px`;

    this.el.style.overflow = "hidden";

    const toolbar = this._toolbar_views[this.model.toolbar.id];
    toolbar.render();

    empty(this.el);
    this.el.appendChild(toolbar.el);
    return show(this.el);
  }

  _get_size() {
    return 30;
  }
}

export namespace ToolbarPanel {
  export interface Attrs extends Annotation.Attrs {
    toolbar: Toolbar
  }

  export interface Opts extends Annotation.Opts {}
}

export interface ToolbarPanel extends ToolbarPanel.Attrs {}

export class ToolbarPanel extends Annotation {

  constructor(attrs?: Partial<ToolbarPanel.Attrs>, opts?: ToolbarPanel.Opts) {
    super(attrs, opts)
  }

  static initClass(): void {
    this.prototype.type = 'ToolbarPanel';
    this.prototype.default_view = ToolbarPanelView;

    this.define({
      toolbar: [ p.Instance ],
    });
  }
}
ToolbarPanel.initClass();
