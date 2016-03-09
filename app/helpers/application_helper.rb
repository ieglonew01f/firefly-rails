module ApplicationHelper
  def success_json(status, message, data)
    render json: {status: status, message: message, data: data}
  end

  def error_json(status, code, message)
    render(:status => status, :json => {:error => {:error_code => code, :error_message => message}})
  end
end
