const getToken = () => {
	return document.cookie.split('token=')[1];
}

const parseDate = (date) => (new Date(date)).toLocaleString()

const parseObjectives = (objs) => {
	if(typeof objs !== 'object') return '';

	const objectives = objs.reduce( (acc, obj) => {
		acc += obj.objective + '\n';
		return acc;
	},'');	

	return objectives;
}

export {
	getToken,parseDate,parseObjectives
}