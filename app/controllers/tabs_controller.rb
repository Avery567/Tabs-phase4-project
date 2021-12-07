class TabsController < ApplicationController

    def index
        tabs = current_user.tabs
        render json: tabs include: :items
    end

    def show 
        tab = Tab.find(params[:id])
        render json: tab
    end

    def create 
        tab = Tab.create(tab_params)
        if tab.valid?
            render json: tab, status: :created 
        else 
            render json: tab.errors.full_messages, status: :unprocessable_entity 
        end 
    end

    def destroy 
        tab = Tab.find_by(id: params[:id])
        if tab 
            tab.destroy
            head :no_content 
        else  
            render json: "Tab does not exist", status: :not_found 
        end
    end

    private 

    def tab_params 
        params.permit(:name)
    end

end
