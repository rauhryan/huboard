import Ember from 'ember';

var FilterGroups = Ember.Service.extend({
  board: Ember.inject.service("filter_groups/board"),
  milestone: Ember.inject.service("filter_groups/milestone"),
  label: Ember.inject.service("filter_groups/label"),
  user: Ember.inject.service("filter_groups/user"),
  member: Ember.inject.service("filter_groups/member"),

  groups: ["board", "milestone", "label", "user", "member"],
  setGroups: function(model){
    var self = this;
    this.get("groups").forEach(function(group){
      self.get(group).create(model);
    });
    this.set("filterGroupsCreated", true);
  },

  allFilters: function(){
    if(!this.get("filterGroupsCreated")){ return []; }
    return this.get("milestone.filters")
            .concat(this.get("user.filters"))
            .concat(this.get("board.filters"))
            .concat(this.get("label.filters"))
            .concat(this.get("member.filters"));
  }.property("{board,milestone,label,user,member}.filters.@each.mode"),

  active: function(){
    return this.get("allFilters").any(function(f){
      return Ember.get(f, "mode") !== 0;
    });
  }.property("allFilters.@each.mode"),

  clear: function(){
    this.get("allFilters").setEach("mode", 0);
  }
});

export default FilterGroups;
