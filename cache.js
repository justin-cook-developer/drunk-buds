const { GroupMembers } = require('./server/db/index');

class Cache {
  constructor(seconds) {
    this.duration = seconds;
    this.data = {};
  }

  _generateDataValues(groupIds) {
    return {
      groupIds,
      time: Date.now(),
    };
  }

  _isExpired(dataTime, currentTime) {
    const differenceInMs = currentTime - dataTime;
    const differenceInSeconds = differenceInMs / 1000;
    return differenceInSeconds >= this.duration;
  }

  async _set(userId) {
    try {
      let groupIds = await GroupMembers.findAll({
        where: { userId },
        attributes: ['groupId'],
      });
      groupIds = groupIds.map(obj => obj.groupId);
      this.data[userId] = this._generateDataValues(groupIds);
      return groupIds;
    } catch (error) {
      console.error(error);
    }
  }

  get(userId) {
    if (
      this.data.hasOwnProperty(userId) &&
      !this._isExpired(this.data[userId].time, Date.now())
    ) {
      return this.data[userId].groupIds;
    } else {
      return this._set(userId);
    }
  }
}

module.exports = Cache;
