class SessionsController < ApplicationController
    skip_before_action :is_authenticated, only: :create

    def create
        user = User.find_by(full_name: params[:full_name])
        if user&.authenticate(params[:password])
          session[:user_id] = user.id 
          render json: user, status: :ok
        else 
          render json: "Invalid Credentials. Try again!", status: :unauthorized 
        end
      end
    
      def destroy
        session.delete :user_id
        head :no_content
      end

end
