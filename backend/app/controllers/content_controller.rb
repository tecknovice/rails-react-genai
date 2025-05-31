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

  def generate_stream
    response.headers['Content-Type'] = 'text/event-stream'
    response.headers['Cache-Control'] = 'no-cache'
    response.headers['Connection'] = 'keep-alive'
    
    prompt = params[:prompt]
    
    begin
      content_service = ContentService.new
      
      content_service.generate_stream(prompt) do |chunk|
        # Send each chunk as Server-Sent Event
        response.stream.write "data: #{chunk.to_json}\n\n"
      end
      
      # Send completion signal
      response.stream.write "data: [DONE]\n\n"
      
    rescue => e
      response.stream.write "data: #{{ error: e.message }.to_json}\n\n"
    ensure
      response.stream.close
    end
  end
end