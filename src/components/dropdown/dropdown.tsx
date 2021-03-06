import { Component, Element, Listen, Method, Prop, State } from '@stencil/core';
import { DownArrow } from '../../icons';

@Component({
  tag: 'docs-dropdown',
  styleUrl: 'dropdown.css'
})
export class DocsDropdown {
  @Prop() align: 'left' | 'right' | 'center' = 'left';
  @Prop() label: string;
  @State() isOpen = false;
  @Element() element: HTMLElement;

  @Listen('window:click')
  handleClick(event: MouseEvent) {
    const isNode = event.target instanceof Node;
    const isOurs = isNode && this.element.contains(event.target as Node);

    if (!isOurs) {
      this.close();
    }
  }

  @Method()
  close() {
    this.isOpen = false;
  }

  @Method()
  open() {
    this.isOpen = true;
  }

  @Method()
  toggle() {
    this.isOpen = !this.isOpen;
  }

  hostData() {
    return {
      class: {
        'Dropdown': true,
        [`Dropdown--${this.align}`]: true,
        'is-open': this.isOpen
      }
    };
  }

  render() {
    const button = (
      <button
        class="Dropdown-button"
        aria-haspopup="menu"
        aria-expanded={this.isOpen ? 'true' : 'false'}
        onClick={this.toggle.bind(this)}>
        {this.label} <DownArrow/>
      </button>
    );

    const panel = (
      <div
        role="menu"
        class="Dropdown-panel">
        <slot/>
      </div>
    );

    return [
      button,
      panel
    ];
  }
}
