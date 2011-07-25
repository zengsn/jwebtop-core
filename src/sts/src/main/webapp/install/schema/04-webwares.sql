CREATE SEQUENCE webwares_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
CREATE TABLE webwares
(
  name_ character varying(64) NOT NULL,
  author_ character varying(64) NOT NULL,
  release_ character varying(32) NOT NULL,
  screen_ character varying(256),
  logo_ character varying(256),
  icon_ character varying(256),
  description_ text,
  status_ smallint NOT NULL DEFAULT 0,
  versions_ text NOT NULL,
  currentversion_ character varying(64) NOT NULL,
  jsclass_ character varying(256) NOT NULL,
  springcontext_ character varying(256),
  createdtime_ timestamp with time zone NOT NULL DEFAULT now(),
  styles_ text,
  jssources_ text,
  acl_ text,
  title_ character varying(64),
  wid_ bigint NOT NULL DEFAULT nextval('webwares_seq'::regclass),
  CONSTRAINT pk_webware PRIMARY KEY (wid_)
);