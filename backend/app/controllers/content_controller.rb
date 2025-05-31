class ContentController < ApplicationController
  def generate 
    prompt = params[:prompt]
    model = params[:model]

    content_service = ContentService.new
    begin
      content = content_service.generate(prompt, model: model)
      render json: { prompt: prompt, content: content }, status: :ok
    rescue => e
      render json: { prompt: prompt, error: e.message }, status: 500
    end
  end
end