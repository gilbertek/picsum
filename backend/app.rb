# frozen_string_literal: true

require 'rubygems'
require 'net/http'
require 'sinatra'
require 'sinatra/namespace'
require 'json'
require 'pp'
require 'csv'
require 'pry'

ENDPOINT = 'https://pastebin.com/raw/BmA8B0tY'
IMG_PATTERN = %r{(\S+\.photos/id)/(\d+)/(\d+)/(\d+)}.freeze

Image = Struct.new(:url, :id, :width, :height)

namespace '/api/v1' do
  before do
    content_type :json
  end

  def parse_response(args)
    result = []
    CSV.parse(args, col_sep: "\r\n") do |row|
      img = row.first.match(IMG_PATTERN) { |i| Image.new(*i.captures) }
      result << img
    end
    result
  end

  def request_images
    uri = URI.parse(URI.decode_www_form_component(ENDPOINT))
    response = Net::HTTP.get_response(uri)

    return parse_response(response.body) if response.is_a?(Net::HTTPSuccess)

    { status: 200, data: [] }
  end

  get '/images' do
    @images ||= request_images
    @images.map(&:to_h).to_json
  end
end
