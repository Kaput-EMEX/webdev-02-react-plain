console.log("loading golden layout...");

var config = {
  content: [
    {
      type: "row",
      content: [
        {
          type: "react-component",
          component: "test-component",
          props: { label: "A" },
        },
        {
          type: "column",
          content: [
            {
              type: "react-component",
              component: "test-component",
              props: { label: "B" },
            },
            {
              type: "react-component",
              component: "test-component",
              props: { label: "C" },
            },
          ],
        },
      ],
    },
  ],
};

var layout = new GoldenLayout(config, "#layout");

var TestComponent = React.createClass({
  render: function () {
    return <h1>{this.props.label}</h1>;
  },
});

layout.registerComponent("test-component", TestComponent);

//Once all components are registered, call

layout.init();

$(function () {
  $(window).resize(function () {
    layout.updateSize();
  });
});
