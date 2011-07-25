-- Table: profiles

-- DROP TABLE profiles;

CREATE TABLE profiles
(
  pid_ character varying(64) NOT NULL,
  uid_ character varying(64),
  updatedtime_ timestamp with time zone,
  CONSTRAINT pk_pid PRIMARY KEY (pid_),
  CONSTRAINT fk_uid FOREIGN KEY (uid_)
      REFERENCES users (uid_) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT profiles_uid__fkey FOREIGN KEY (uid_)
      REFERENCES users (uid_) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT profiles_uid__fkey1 FOREIGN KEY (uid_)
      REFERENCES users (uid_) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT profiles_uid__fkey2 FOREIGN KEY (uid_)
      REFERENCES users (uid_) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE profiles OWNER TO postgres;
