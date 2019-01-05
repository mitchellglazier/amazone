class Api::ProductsController < ApplicationController

  before_action :set_department
   before_action :set_product, only: [:show, :update, :update]

   def index
     render json: @department.products
   end

   def show
     render json: @product
   end

   def create
     product = @department.products.new(product_params)
     if product.save
       render json: product
     else
       render json: product.errors, status: 422
     end
   end

   def update
     if @product.update(product_params)
       render json: @product
     else
       render json: @product.errors, status: 422
     end
   end

   def destroy
     @product.destroy
   end

   private
     def set_department
       @department = Department.find(params[:department_id])
     end

     def set_product
       @product = Product.find(params[:id])
     end

     def product_params
       params.require(:product).permit(:name, :description, :price, :stock)
     end

end
