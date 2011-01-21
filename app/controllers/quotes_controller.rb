require 'cgi'

class QuotesController < ApplicationController
  before_filter :authenticate, :except => [ :index, :show, :new, :author ]

  # GET /quotes
  # GET /quotes.xml
  def index
    @quotes = Quote.all.sort { |a, b| b.created_at <=> a.created_at }
    #@quotes = Quote.find_by_approved(true)

    @nav_menu = { :title => "Latest quotes", 
    		      :links => [ { :title => "Add", :to => new_quote_path }, 
		  	      { :title => "About", :to => "/help/about" },
			      { :title => "Help", :to => "/help/" }
		  	    ]
		}

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @quotes }
    end
  end

  # GET /authors
  def author_list
    a = Array.new
    
    Quote.select("DISTINCT(author)").each { |i| a.push_back i.author.to_s }
    
    @list = ActiveSupport::JSON.encode(a)
    
    respond_to do |format|
	  format.js  { render :json => { :data => @list } }
    end
  end
  
  # GET /moo
  # GET /quotes/moo
  def author
    @quotes = Quote.where(:author => CGI::unescape(params[:author]))

    @nav_menu = { :title => "#{params[:author]}", 
    		  :links => [ { :title => "Help", :to => "/help/" },
						{ :title => "Back", :to => root_path } 
			    ] 
		}

    respond_to do |format|
      format.html # author.html.erb
      format.xml  { render :xml => @quotes }
    end
  end

  # GET /quotes/1
  # GET /quotes/1.xml
  def show
    @quote = Quote.find(params[:id])
    
    @nav_menu = { :title => "##{@quote.id}", 
    		  :links => [ { :title => "Edit", :to => edit_quote_path(@quote) },
			      { :title => "Help", :to => "/help/" },
		  	      { :title => "Back", :to => root_path } 
			    ] 
		}

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @quote }
    end
  end

  # GET /quotes/new
  # GET /quotes/new.xml
  def new
    @quote = Quote.new

    @nav_menu = { :title => "Add quote", 
    		  :links => [ { :title => "Help", :to => "/help/" },
    		              { :title => "Back", :to => root_path } ] }


    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @quote }
    end
  end

  # GET /quotes/1/edit
  def edit
    @quote = Quote.find(params[:id])

    @nav_menu = { :title => "Edit quote", 
    		  :links => [ { :title => "Help", :to => "/help/" },
    		        { :title => "Back", :to => root_path } ] }
  end

  # POST /quotes
  # POST /quotes.xml
  def create
    @quote = Quote.new(params[:quote])

    @quote.approved = false if @quote.approved.nil?

    respond_to do |format|
      if @quote.save
        format.html { redirect_to(@quote, :notice => 'Quote was successfully created.') }
        format.xml  { render :xml => @quote, :status => :created, :location => @quote }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @quote.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /quotes/1
  # PUT /quotes/1.xml
  def update
    @quote = Quote.find(params[:id])

    respond_to do |format|
      if @quote.update_attributes(params[:quote])
        format.html { redirect_to(@quote, :notice => 'Quote was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @quote.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /quotes/1
  # DELETE /quotes/1.xml
  def destroy
    @quote = Quote.find(params[:id])
    @quote.destroy

    respond_to do |format|
      format.html { redirect_to(quotes_url) }
      format.xml  { head :ok }
    end
  end
end
