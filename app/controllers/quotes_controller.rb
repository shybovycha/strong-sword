require 'cgi'

class QuotesController < ApplicationController
  before_filter :authenticate, :only => [ :edit, :delete, :admin ]

  # GET /quotes
  # GET /quotes.xml
  def index
    I18n.locale = params[:lang]

    @quote = Quote.new
    @quotes = Quote.where(:approved => true).sort { |a, b| b.created_at <=> a.created_at }

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @quotes }
    end
  end

  def approve
    redirect_to root_url if (session[:uid].nil? || User.find(session[:uid]).nil?)

    quote = Quote.find(params[:id])

    redirect_to '/admin/' if quote.nil?

    quote.update_attribute(:approved, true)

    redirect_to '/admin/'
  end

  def admin
    retirect_to '/login/' if (!session[:uid] || User.find(session[:uid]).nil?)

    @quotes = (Quote.where(:approved => false) + Quote.where(:approved => nil)).sort { |a, b| b.created_at <=> a.created_at }

    respond_to do |format|
      format.html
    end
  end

  # GET /authors
  def author_list
    a = Array.new
	
    Quote.select("DISTINCT(author)").each { |i| a << i.author }
	
    respond_to do |format|
	  format.js  { render :json => a.to_json }
    end
  end

  # GET /after
  # GET /after/id
  def quotes_after
    if params[:id].nil?
      @quotes = Quote.limit(10).offset(0).order("created_at asc")
    else
      @quotes = Quote.where("id > ?", params[:id]).limit(10).offset(0).order("created_at asc")
    end

    respond_to do |format|
      #format.html # after.html.erb
      format.js { render :json => @quotes.to_json }
    end
  end

  # GET /before
  # GET /before/id
  def after
    if params[:id].nil?
      @quotes = Quote.order("created_at desc").limit(10).offset(0)
    else
      @quotes = Quote.where("id < ?", params[:id]).order("created_at desc").limit(10).offset(0)
    end

    respond_to do |format|
      #format.html # before.html.erb
      format.js { render :json => @quotes.to_json }
    end
  end

  # GET /moo
  # GET /quotes/moo
  def author
    I18n.locale = params[:lang]

    @quotes = Quote.where(:author => CGI::unescape(params[:author]))
    @quote = Quote.new

    respond_to do |format|
      format.html # author.html.erb
      format.xml  { render :xml => @quotes }
    end
  end

  # GET /quotes/1
  # GET /quotes/1.xml
  def show
    I18n.locale = params[:lang]

    @quote = Quote.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @quote }
    end
  end

  # GET /quotes/new
  # GET /quotes/new.xml
  def new
    I18n.locale = params[:lang]

    @quote = Quote.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @quote }
    end
  end

  # GET /quotes/1/edit
  def edit
    I18n.locale = params[:lang]

    @quote = Quote.find(params[:id])
  end

  # POST /quotes
  # POST /quotes.xml
  def create
    @quote = Quote.new(params[:quote])

    @quote.approved = false if @quote.approved.nil?

    @js_response = [ :status => "ok" ].to_json
    @js_error = [ :status => "error" ].to_json

    respond_to do |format|
      if @quote.save
	format.js { render :json => @js_response }
        format.html { redirect_to(@quote, :notice => :quote_created) }
        format.xml  { render :xml => @quote, :status => :created, :location => @quote }
      else
	format.js { render :json => @js_error }
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
        format.html { redirect_to(@quote, :notice => :quote_updated) }
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
