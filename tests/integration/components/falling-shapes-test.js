import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('falling-shapes', 'Integration | Component | falling shapes', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{falling-shapes}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#falling-shapes}}
      template block text
    {{/falling-shapes}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
