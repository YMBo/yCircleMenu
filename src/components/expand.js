export default {
    name: 'Expand',
    functional: true,
    props: {
        render: Function
    },
    render: (h, ctx) => {
        return ctx.props.render(h);
    }
};