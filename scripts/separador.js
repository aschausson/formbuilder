/**
 * Star rating class - show 5 stars with the ability to select a rating
 */

// configure the class for runtime loading
if (!window.fbControls) window.fbControls = [];
window.fbControls.push(function(controlClass) {
  /**
   * Star rating class
   */
  class separador extends controlClass {

    /**
     * Class configuration - return the icons & label related to this control
     * @returndefinition object
     */
    static get definition() {
      return {
        icon: '⊱⊰',
        i18n: {
          default: 'Separador'
        }
      };
    }

    /**
     * javascript & css to load
     */
    configure() {
    }

    /**
     * build a text DOM element, supporting other jquery text form-control's
     * @return {Object} DOM Element to be injected into the form.
     */
    build() {
      return this.markup('hr', null, {id: this.config.name});
    }

    /**
     * onRender callback
     */
    onRender() {
    }
  }

  // register this control for the following types & text subtypes
  controlClass.register('separador', separador);
  return controlClass;
});