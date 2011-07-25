CREATE TABLE configurations
(
  key_ character varying(64) NOT NULL,
  name_ character varying(64),
  value_ character varying(128),
  description_ character varying(256),
  CONSTRAINT pk_key PRIMARY KEY (key_)
);