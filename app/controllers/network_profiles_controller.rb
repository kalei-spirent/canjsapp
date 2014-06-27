class NetworkProfilesController < ApplicationController

	skip_before_filter :verify_authenticity_token

	def show
		id = params[:id]
		puts id
		np = NetworkProfile.find(id)
		puts np
		render :json => np
	end

	def create
		name = params[:name]
		np = NetworkProfile.new
		np.name = name
		np.save
		render :json => { "STATUS" => "OK "}
	end

	def destroy
		id = params[:id]
		np = NetworkProfile.find(id)
		puts np
		if np
			np.delete
		end

		render :json => { "STATUS" => "OK "}
	end

	def index
		@nps = NetworkProfile.all
		render :json => @nps
	end
end
