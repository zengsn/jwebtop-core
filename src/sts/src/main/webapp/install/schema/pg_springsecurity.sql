CREATE TABLE acl_sid
(
  id bigint NOT NULL,
  sid character varying(100) NOT NULL,
  principal boolean NOT NULL,
  CONSTRAINT acl_sid_pkey PRIMARY KEY (id)
);
CREATE TABLE acl_class
(
  id bigint NOT NULL,
  "class" character varying(100) NOT NULL,
  CONSTRAINT acl_class_pkey PRIMARY KEY (id),
  CONSTRAINT acl_class_class_key UNIQUE (class)
);
CREATE TABLE acl_object_identity
(
  id bigint NOT NULL,
  object_id_class bigint NOT NULL,
  object_id_identity bigint NOT NULL,
  parent_object bigint,
  owner_sid bigint,
  entries_inheriting smallint NOT NULL,
  CONSTRAINT acl_object_identity_pkey PRIMARY KEY (id),
  CONSTRAINT acl_object_identity_object_id_class_fkey FOREIGN KEY (object_id_class)
      REFERENCES acl_class (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT acl_object_identity_owner_sid_fkey FOREIGN KEY (owner_sid)
      REFERENCES acl_sid (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT acl_object_identity_parent_object_fkey FOREIGN KEY (parent_object)
      REFERENCES acl_object_identity (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT acl_object_identity_object_id_class_key UNIQUE (object_id_class, object_id_identity)
);
CREATE TABLE acl_entry
(
  id bigint NOT NULL,
  acl_object_identity bigint NOT NULL,
  ace_order integer NOT NULL,
  sid bigint NOT NULL,
  mask integer NOT NULL,
  granting smallint NOT NULL,
  audit_success smallint NOT NULL,
  audit_failure smallint NOT NULL,
  CONSTRAINT acl_entry_pkey PRIMARY KEY (id),
  CONSTRAINT acl_entry_acl_object_identity_fkey FOREIGN KEY (acl_object_identity)
      REFERENCES acl_object_identity (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT acl_entry_sid_fkey FOREIGN KEY (sid)
      REFERENCES acl_sid (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT acl_entry_acl_object_identity_key UNIQUE (acl_object_identity, ace_order)
);


CREATE SEQUENCE acl_sid_id_seq;
ALTER TABLE acl_sid ALTER COLUMN id SET DEFAULT NEXTVAL('acl_sid_id_seq');
UPDATE acl_sid SET id = NEXTVAL('acl_sid_id_seq');

CREATE SEQUENCE acl_class_id_seq;
ALTER TABLE acl_class ALTER COLUMN id SET DEFAULT NEXTVAL('acl_class_id_seq');
UPDATE acl_class SET id = NEXTVAL('acl_class_id_seq');

CREATE SEQUENCE acl_object_identity_id_seq;
ALTER TABLE acl_object_identity ALTER COLUMN id SET DEFAULT NEXTVAL('acl_object_identity_id_seq');
UPDATE acl_object_identity SET id = NEXTVAL('acl_object_identity_id_seq');

CREATE SEQUENCE acl_entry_id_seq;
ALTER TABLE acl_entry ALTER COLUMN id SET DEFAULT NEXTVAL('acl_entry_id_seq');
UPDATE acl_entry SET id = NEXTVAL('acl_entry_id_seq');