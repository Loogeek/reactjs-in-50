class Component {
    constructor(props) {
        this.props = props
    }
    
    setState(state) {
        const oldEl = this.el
        this.state = state
        this.el = this._renderDOM()
        if (this.onStateChange) {
            this.onStateChange(oldEl, this.el)
        }
    }

    _renderDOM() {
        this.el = createElement(this.render())
        if (this.onClick) {
            this.el.addEventListener('click', this.onClick.bind(this))
        }
        return this.el
    }
}

class LikeButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLiked: false
        }
    }

    onClick() {
        this.setState({
            isLiked: !this.state.isLiked
        })
    }

    render() {
        return (
            `<button class="like-btn" style="background-color: ${this.props.bgColor}">
                <span class="like-text">${this.state.isLiked ? '点赞' : '取消'}</span>
                <span>👍</span>
            </button>`
        )        
    }
}

const mount = (component, wrapper) => {
    wrapper.appendChild(component._renderDOM())
    component.onStateChange = (oldEl, newEl) => {
        wrapper.insertBefore(newEl, oldEl)
        wrapper.removeChild(oldEl)
    }
}

const createElement = (domString) => {
    const el = document.createElement('div')
    el.innerHTML = domString
    return el
}


const app = document.querySelector('#app')
mount(new LikeButton({bgColor: 'red'}), app)