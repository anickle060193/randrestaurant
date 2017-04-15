module DeviseHelper

  def devise_error_messages!
    render 'shared/errors', object: resource
  end

end