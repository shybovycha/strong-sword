class StaticsController < ApplicationController
  def about
    @nav_menu = { :title => "About", 
    		      :links => [ { :title => "Back", :to => root_path } ] 
				}

    respond_to do |format|
      format.html # about.html.erb
    end
  end

  def help
    @nav_menu = { :title => "Help", 
    		      :links => [ { :title => "Back", :to => root_path } ] 
				}

    respond_to do |format|
      format.html # help.html.erb
    end
  end
end
