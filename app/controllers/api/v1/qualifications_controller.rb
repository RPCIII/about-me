class Api::V1::QualificationsController < ApplicationController
  def index
    qualification = Qualification.all.order(created_at: :desc) 
    render json: qualification
  end

  def create
    qualification = Qualification.create!(qualification_params)
    if qualification
      render json: qualification
    else
      render json: qualification.errors
    end
  end

  def show
    if qualification
      render json: qualification
    else
      render json: qualification.errors
    end
  end

  def destroy
    qualification&.destroy
    render json: { message: 'Qualification removed.' }
  end

  private

  def qualification_params
    params.permit(:name, :image, :skill, :experience)
  end

  def qualification
    @qualification ||= Qualification.find(params[:id])
  end

end