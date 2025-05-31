class ContentService 
  include ActiveSupport::Configurable

  def initialize(api_key = ENV["OPENAI_API_KEY"])
    @conn = Faraday.new(url: "https://api.openai.com") do |f|
      f.request :json
      f.response :json, content_type: /\bjson$/
      f.adapter Faraday.default_adapter
    end

    @headers = {
      "Authorization" => "Bearer #{api_key}",
      "Content-Type" => "application/json"
    }
  end

  def generate(prompt, model: "gpt-3.5-turbo")
    payload = {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    }

    response = @conn.post("/v1/chat/completions", payload, @headers)
    Rails.logger.info "OpenAI API Response: #{response.status} - #{response.body}"

    if response.success?
      response.body.dig("choices", 0, "message", "content").strip
    else
      raise "OpenAI API Error: #{response.status} - #{response.body}"
    end
  end

  def generate_stream(prompt, model: "gpt-4o-mini", &block)
    payload = {
      model: model,
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      stream: true
    }

    response_text = ""
    
    @conn.post("/v1/chat/completions") do |req|
      req.headers = @headers
      req.body = payload.to_json
      
      req.options.on_data = proc do |chunk, overall_received_bytes|
        chunk.split("\n").each do |line|
          next if line.strip.empty? || !line.start_with?("data: ")
          
          data = line.sub(/^data: /, "")
          next if data == "[DONE]"
          
          begin
            json_data = JSON.parse(data)
            content = json_data.dig("choices", 0, "delta", "content")
            
            if content
              response_text += content
              block.call(content) if block_given?
            end
          rescue JSON::ParserError => e
            Rails.logger.warn "Failed to parse JSON: #{data}"
          end
        end
      end
    end
    
    response_text
  rescue => e
    Rails.logger.error "OpenAI Streaming Error: #{e.message}"
    raise "OpenAI API Error: #{e.message}"
  end
  
end