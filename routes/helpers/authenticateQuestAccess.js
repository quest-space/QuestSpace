const Participation = require(`../../models/participation`);
const { getQuestStatus } = require(`./helperFunctions`);

const isThisQuestValidForParticipant = async (username, questsDetails, currTime) => {
  const participantParticipations = await Participation.find({ participantUser: username }).exec();
  return questsDetails.filter(quest => 
    participantParticipations.find(participation => participation.questName === quest.questName) || (quest.nature === `public` && getQuestStatus(quest.startTime, quest.endTime, currTime) === `Upcoming`)
  );
}

const isThisQuestValidForHost = async (username, questsDetails, currTime) => {
  return questsDetails.filter(quest => quest.hostUser === username);
}

const getValidQuests = (userType, username, questsDetails, currTime) => 
  userType === `participant` ? isThisQuestValidForParticipant(username, questsDetails, currTime) : isThisQuestValidForHost(username, questsDetails, currTime);

module.exports = { getValidQuests };