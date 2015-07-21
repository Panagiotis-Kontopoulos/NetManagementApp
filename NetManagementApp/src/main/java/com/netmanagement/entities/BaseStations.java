package com.netmanagement.entities;



public class BaseStations {
	
	private String id;
	private String user;
	private String Operator;
	private int mcc;
	private int mnc;
	private int cid;
	private int lac;
	private Double BSlatitude;
	private Double BSlongtitude;
	private String timestamp;
	
	public void setAll(String[] Data) {
		id=Data[0];
		user=Data[1];
		Operator=Data[2];
		mcc=Integer.parseInt(Data[3]);
		mnc=Integer.parseInt(Data[4]);
		cid=Integer.parseInt(Data[5]);
		lac=Integer.parseInt(Data[6]);
		BSlatitude=Double.parseDouble(Data[7]);
		BSlongtitude=Double.parseDouble(Data[8]);
		timestamp=Data[9];
	}
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getUser() {
		return user;
	}
	public void setUser(String user) {
		this.user = user;
	}
	public String getOperator() {
		return Operator;
	}
	public void setOperator(String operator) {
		Operator = operator;
	}
	public int getMcc() {
		return mcc;
	}
	public void setMcc(int mcc) {
		this.mcc = mcc;
	}
	public int getMnc() {
		return mnc;
	}
	public void setMnc(int mnc) {
		this.mnc = mnc;
	}
	public int getCid() {
		return cid;
	}
	public void setCid(int cid) {
		this.cid = cid;
	}
	public int getLac() {
		return lac;
	}
	public void setLac(int lac) {
		this.lac = lac;
	}
	public Double getBSlatitude() {
		return BSlatitude;
	}
	public void setBSlatitude(Double bSlatitude) {
		BSlatitude = bSlatitude;
	}
	public Double getBSlongtitude() {
		return BSlongtitude;
	}
	public void setBSlongtitude(Double bSlongtitude) {
		BSlongtitude = bSlongtitude;
	}
	public String getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}
	
	
}
