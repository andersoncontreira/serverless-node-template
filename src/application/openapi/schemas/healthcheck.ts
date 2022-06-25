// class EntrySchema(Schema):
// status = fields.Str(example=HealthStatus.HEALTHY.value)
// duration = fields.Str(example="0:00:00.013737")
// tags = fields.List(fields.Str(example="db"))
//
//
// class EntryData(Schema):
// name = fields.Nested(EntrySchema)
//
//
// class HealthCheckSchema(Schema):
// status = fields.Str(example=HealthStatus.HEALTHY.value)
// total_duration = fields.Str(example="0:00:00.013737")
// entries = fields.Nested(EntryData)
