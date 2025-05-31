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
  
end