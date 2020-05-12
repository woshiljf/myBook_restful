export default function myflat(arr,result=[]){
	for(let i=0;i<arr.length;i++){
		var item = arr[i];
		if(Array.isArray(item)){
		    return	myflat(item,result)}
		else{
			result.push(item)}
	}
	return result
}
