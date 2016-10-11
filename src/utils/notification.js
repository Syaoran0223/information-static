export const notify = ({
  type = 'success',
  title = '',
  message = ''
}, settings) => {

  let icon = type == 'success'
    ? 'glyphicon glyphicon-ok-sign'
    : 'glyphicon glyphicon-warning-sign'

  let default_settings = {
    type: type,
    position: 'fixed',
    delay: 3000,
    placement: {
      from: "top",
      align: "right"
    },
    z_index: 1050
  }

  $.notify({
    icon,
    title,
    message
  }, {...default_settings, ...settings})
}

export const notify_ok = notify

export const notify_error = (options, settings) => {
  options.type = 'danger'
  notify(options, settings)
}
