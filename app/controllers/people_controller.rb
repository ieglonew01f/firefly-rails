class PeopleController < InheritedResources::Base
  before_action :authenticate_user!
  #send friend request
  #status code = 0
  def add_friend
    person = Person.new
    person.for_id = params[:for_id]
    person.by_id = current_user.id
    person.status = 0

    if person.save
      success_json(200, 'Friend request sent successfully', person)
    else
      error_json(422, 422, 'Looks like something went wrong while processing your request, please try again after sometime.')
    end
  end

  #accept friend request
  #status code = 1
  def accept_friend
    person = Person.where("for_id = ? AND by_id = ?", current_user.id, params[:by_id])

    if person
      person.status = 1
      if person.save
        success_json(200, 'Friend request accepted successfully', person)
      else
        error_json(422, 422, 'Looks like something went wrong while processing your request, please try again after sometime.')
      end
    else
      error_json(422, 422, 'Looks like something went wrong while processing your request, please try again after sometime.')
    end
  end

  #Deny friend request
  #status code = 2
  def deny_friend
    person = Person.where("for_id = ? AND by_id = ?", current_user.id, params[:by_id])

    if person
      person.status = 2
      if person.save
        success_json(200, 'Friend request denied successfully', person)
      else
        error_json(422, 422, 'Looks like something went wrong while processing your request, please try again after sometime.')
      end
    else
      error_json(422, 422, 'Looks like something went wrong while processing your request, please try again after sometime.')
    end
  end

  #remove friend from friend list
  def remove_friend
    person = Person.where("for_id = ? AND by_id = ?", current_user.id, params[:by_id])

    if person.destroy
      success_json(200, 'Friend removed from list successfully', person)
    else
      error_json(422, 422, 'Looks like something went wrong while processing your request, please try again after sometime.')
    end
  end

  #follow someone stalker ;)
  def follow_person
    follower = Follower.where("follower_id = ? AND following_id = ?", current_user.id, params[:following_id]).first

    if not followerp
      follower = Follower.new
      follower.follower_id = current_user.id
      follower.following_id = params[:following_id]

      if follower.save
        success_json(200, 'User successfully followed', nil)
      else
        error_json(422, 422, 'Looks like something went wrong while processing your request, please try again after sometime.')
      end
    else
      error_json(422, 422, 'Looks like something went wrong while processing your request, please try again after sometime.')
    end
  end


  def unfollow_person
    follower = Follower.where("follower_id = ? AND following_id = ?", current_user.id, params[:following_id]).first

    if follower.destroy
      success_json(200, 'User successfully un followed', nil)
    else
      error_json(422, 422, 'Looks like something went wrong while processing your request, please try again after sometime.')
    end
  end

  private
    def person_params
      params.require(:person).permit(:by_id, :for_id, :status)
    end
end
