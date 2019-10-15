import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {sanitize} from 'dompurify';
import {adjust, originOrEl, resolve} from './utils';
import * as styles from './styles';
import * as themes from './themes';

class Tooltip extends Component {
    static get displayName() {
        return 'Tooltip';
    }

    static get propTypes() {
        return {
            // Props from state tree
            show: PropTypes.bool.isRequired,
            origin: PropTypes.oneOfType([
                PropTypes.object, PropTypes.string
            ]),
            el: PropTypes.object,
            place: PropTypes.oneOfType([
                PropTypes.string, PropTypes.array
            ]).isRequired,
            content: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.object,
                PropTypes.arrayOf(PropTypes.object)
            ]),
            auto: PropTypes.bool.isRequired,
            within: PropTypes.func,

            // Props from wrapper props
            name: PropTypes.string,
            id: PropTypes.string,
            className: PropTypes.string,
            darkTheme: PropTypes.bool,
            onHover: PropTypes.func,
            onLeave: PropTypes.func,
        };
    }

    static get defaultProps() {
        return {
            show: false,
            place: 'top',
            auto: true,
        };
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const {place, content, children} = nextProps;
        const origin = originOrEl(nextProps);
        if (origin && (originOrEl(this.props) != origin || this.props.place !== place ||
            this.props.content !== content || this.props.children !== children)) {
            this.updatePosition(nextProps);
        }
    }

    updatePosition(props) {
        // Render content into hidden DOM element to determine size
        const content = this.children(props);
        ReactDOM.render(<div>{content}</div>, this.refs.shadow, () => {
            const state = adjust(this.refs.shadow, props);
            this.setState(state);
        });
    }

    children(props = this.props) {
        let {content} = props;
        if (typeof content === 'string') {
            content = <div dangerouslySetInnerHTML={{__html: sanitize(content)}}/>;
        }
        return content ? content : props.children;
    }

    render() {
        const {id, className, show, onHover, onLeave, darkTheme} = this.props;
        const origin = originOrEl(this.props);
        const {place, offset} = this.state;
        const content = this.children();
        const visibility = (origin && show) ? 'visible' : 'hidden';

        let base = darkTheme ? {...themes.dark.base} : {...themes.simple.base};
        const style = {
            base: {...styles.base, ...base, visibility, ...offset},
            content: {...styles.content, ...themes.simple.content},
            arrow: {...styles.arrow},
            border: {...themes.simple.border, ...styles.border(darkTheme).base, ...styles.border(darkTheme)[place],},
        };
        style.shadow = {...style.content, visibility: 'hidden', position: 'absolute'};

        return (
            <div>
                <div
                    ref="tooltip"
                    style={style.base}
                    id={id}
                    className={className}
                    onMouseEnter={onHover}
                    onMouseLeave={onLeave}
                >
                    <div
                        ref="content"
                        style={style.content}
                        id={`${id}-content`}
                        className={`${className}-content`}
                    >
                        {content}
                    </div>
                    <div
                        style={style.arrow}
                        id={`${id}-arrow`}
                        className={`${className}-arrow`}
                        key={`a-${place}`}
                    >
                        <span ref="border" style={style.border} key={`b-${place}`}></span>
                    </div>
                </div>
                <div
                    ref="shadow"
                    style={style.shadow}
                    id={`${id}-shadow`}
                    className={`${className}-shadow`}
                />
            </div>
        );
    }
}

function select(state, ownProps) {
    const {tooltip: tooltips} = state;
    const names = resolve(ownProps);
    if (1 < names.length) {
        console.error(`<Tooltip> does not accept a list of names as 'name' props: ${names}`);
    }
    const name = names[0];
    const tooltip = tooltips[name];
    return {...tooltip, ...ownProps};
}

export default connect(select)(Tooltip);
