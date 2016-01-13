const React = require('react')

module.exports = React.createClass({
  propTypes: {
    status: React.PropTypes.number,
    reason: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      status: NaN,
      reason: 'unknown'
    }
  },

  message() {
    if (this.props.status === 0) {
      return 'Nevergreen is not responding'
    }
    return 'The remote server is returning "' + this.props.reason + '"'
  },

  render() {
    return (
      <div className='error-message'>{this.message()}</div>
    )
  }
})